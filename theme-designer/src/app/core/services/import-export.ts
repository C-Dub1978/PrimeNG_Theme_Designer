import { computed, inject, Service, signal } from '@angular/core';
import { StudioStateSchema, ThemeFileExport, ThemeFileImport } from '@core/models/theme-designer.model';
import { MessageService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';

/**
 * Data shape backing the Setup step's Signal Form.
 */
export interface SetupFormData {
  themeName: string;
  presetBase: ('Aura' | 'Lara' | 'Nora' | 'Material') | null;
  enableDarkTheme: boolean;
}

@Service()
export class ImportExport {
    private toastService = inject(MessageService);
    // ─── File Upload State ───────────────────────────────────────────────
    private _uploadedFile = signal<File | null>(null);
    public uploadedFile = computed(() => this._uploadedFile.asReadonly());

    private _isFileUploaded = signal(false);
    public isFileUploaded = computed(() => this._isFileUploaded.asReadonly());

    private _setupModel = signal<SetupFormData | undefined>(undefined);
    public setupModel = computed(() => this._setupModel.asReadonly());
    
    set setupmodel(model: SetupFormData) {
        this._setupModel.set(model);
    }

    // ─── File Removed Handler ────────────────────────────────────────────
    onFileRemoved(): void {
      this.removeFile();
    }
  
    // ─── Remove File Handler ─────────────────────────────────────────────
    private removeFile(): void {
      this._uploadedFile.set(null);
      this._isFileUploaded.set(false);
  
      // Clear form values that were populated from the file import
      this.setupmodel = ({
        themeName: '',
        presetBase: null,
        enableDarkTheme: false,
      });
    }
    
    onFileSelected(event: FileSelectEvent): void {
        const files = event.files;
        if (!files || files.length === 0) {
          return;
        }
        const file = files[0] as File;
        // Read file content and validate with Zod schema
        const reader = new FileReader();
        reader.onload = (): void => {
          try {
            const content = reader.result as string;
            const parsed = JSON.parse(content);
    
            // Validate against StudioStateSchema
            const validationResult = StudioStateSchema.safeParse(parsed);
    
            if (validationResult.success) {
              const validData = validationResult.data;
    
              // Extract original configuration and patch into the setup model
              const setupConfig = validData.setupConfig;
    
              this._setupModel.set({
                themeName: setupConfig.name,
                presetBase: setupConfig.preset,
                enableDarkTheme: setupConfig.hasDarkTheme,
              });
    
              // Lock the preset dropdown (file took precedence)
              this._isFileUploaded.set(true);
    
              // Store the uploaded file reference
              this._uploadedFile.set(file);
    
              this.toastService.add({
                severity: 'success',
                summary: 'Theme Imported',
                detail: `Successfully loaded theme: ${setupConfig.name}`,
                life: 3000,
              });
            } else {
              // Zod validation failed — clear file input and alert user
              this._uploadedFile.set(null);
              this._isFileUploaded.set(false);
    
              const errorMessage = validationResult.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join('; ');
    
              this.toastService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: `Invalid theme file: ${errorMessage}`,
                life: 5000,
              });
            }
          } catch {
            // JSON.parse failed — clear file input and alert user
            this._uploadedFile.set(null);
            this._isFileUploaded.set(false);
    
            this.toastService.add({
              severity: 'error',
              summary: 'Parse Error',
              detail:
                'The selected file is not valid JSON. Please choose a valid theme configuration file.',
              life: 5000,
            });
          }
        };
    
        reader.onerror = (): void => {
          this._uploadedFile.set(null);
          this._isFileUploaded.set(false);
    
          this.toastService.add({
            severity: 'error',
            summary: 'Read Error',
            detail: 'Failed to read the selected file. Please try again.',
            life: 5000,
          });
        };
    
        reader.readAsText(file);
      }
  /**
   *
   * @param dataObject - the entire parsed schema object, spread together based on all the parts of the
   *   different editing sections.
   * @returns
   */
  async generateExportFile(dataObject: Partial<ThemeFileExport>): Promise<string> {
    // 1. Stringify with exact formatting (2 spaces ensures it matches exactly later)
    const jsonString = JSON.stringify(dataObject, null, 2);

    // 2. Generate a SHA-256 hash of the JSON string
    const msgUint8 = new TextEncoder().encode(jsonString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    // 3. Write the file with the hash locked in a comment at the top
    return `/* eslint-disable */
    // Generated by https://ccl.wtf
    // Signature: ${hashHex}
    
    export default ${jsonString};`;
  }

  /**
   *
   * @param fileContents - the raw file that has just been stringified, via user upload. 2 Layers of security to ensure
   *  no bad actors are able to inject any malicious code in our applicatino
   * @returns
   */
  async secureImportFile(fileContents: string): Promise<any | null> {
    try {
      // 1. Extract the expected signature from the top comment
      const sigMatch = fileContents.match(/\/\/ Signature:\s*([a-f0-9]{64})/);
      if (!sigMatch) throw new Error('File is missing its security signature.');
      const expectedSignature = sigMatch[1];

      // 2. Use your substring method to isolate the raw JSON payload
      const firstBrace = fileContents.indexOf('{');
      const lastBrace = fileContents.lastIndexOf('}');
      if (firstBrace === -1 || lastBrace === -1) throw new Error('Malformed file structure.');

      const extractedJsonString = fileContents.substring(firstBrace, lastBrace + 1);

      // 3. Recalculate the hash of the extracted data
      const msgUint8 = new TextEncoder().encode(extractedJsonString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const actualSignature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      // 4. Strict check: Did they tinker with it at all?
      if (expectedSignature !== actualSignature) {
        throw new Error('File integrity check failed. The file has been modified.');
      }

      // 5. Safe parse & Zod validation
      const rawObject = JSON.parse(extractedJsonString);
      return rawObject; // Follow this up with ThemeDesignerSchema.parse(rawObject)
    } catch (error) {
      console.error('Upload rejected:', error);
      alert('Invalid File: The file has been modified or corrupted.');
      return null;
    }
  }

  handleInboundSchemaSlicing(themeObject: ThemeFileImport): any {
    const fileContents = JSON.stringify(themeObject);
    // Find the first opening brace and the last closing brace
    const firstBrace = fileContents.indexOf('{');
    const lastBrace = fileContents.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error('Invalid file structure');
    }

    // Extract just the object string
    const jsonString = fileContents.substring(firstBrace, lastBrace + 1);

    // This will work ONLY if the exported file strictly used double quotes
    const rawObject = JSON.parse(jsonString);
  }
}
