# Theme Designer Project

**High Level**</br>

    This application will be used to create a user friendly, theme designer for creating and importing/exporting a .ts file that you can pass into your application's providePrimeNg() in the Angular app config. The application itself should support tablet, and desktop sizes (varying. No mobile as this is something that needs to be done on a bigger screen to fit everything, why the hell would you attempt this on a tiny phone anyways???). It should be an Angular 22 application, with routing, scss, PrimeNG 22 (current is a release candidate) without any tailwind or css libraries/frameworks, and should be ready to update when Angular and PrimeNG evolve.

    The super duper high 30k foot view: Its a bit of a PITA to change a PrimeNG theme. Its certainly not impossible, its just a very large object to juggle, and to begin with, PrimeNG already gives you the ability to customize their components and views out of the box, which is amazing, compared to something like Material. There is only one other user-friendly [PrimeNG theme generator](https://prime-ng-theme-fe.vercel.app/) that I have found, and its a HUGE improvement over doing this manually. My personal opinion on it though, was that it was a cool idea, but execution wise, I believe it could be broken down and made to be super super ridiculously easy, and would require less effort on the users part. Basically, I promised I would code my own version that would be light-years more user-friendly than the other one that I found, and I will share it as open source.

**High Level Layout**</br>

    The application is setup into 2 pages. The first page, which loads up as the 'setup' route/component, is a very simple PrimeNG stepper/wizard, that has 3 steps (form fields). Each step grabs a bit of information from the user, and continues until we have a new 'name' for the theme itself, a base preset (Aura, Lara, Nora, Material), and a boolean value for 'add dark mode to theme?'

    Once the user has filled out the form fields in each step, we then load the '/studio' route/component. The studio is where the magic happens. We will be using a nice grid system, some tabs, and some neat buttons to allow the user to make changes to the theme schema, and a button to 'refresh' and show the user how their custom theme looks in that moment in time based on its state. Export button to save their theme in a .ts file, and lastly a 'reset' button that lets them pick a base preset and completely start everything from scratch (with the exception of the form/stepper).

    - Landing page aka Studio
    It is split into two sections. The left section will be where the user edits all the differnt token values, and the right section will be reserved for which group of components they want to view. This overall view will be a nice grid system. The grid will be simple in that its just a primeNG drawer on the left side, and a bunch of components to look at on the right. The left drawer will have a toggle button in the header to expand/collapse the drawer. The right side is static and will take up 100% of its  available viewport width (which is based on the current width of the drawer - when the drawer is closed, the right side takes up 100vw, when the drawer is at 30% open, the right side will take up 70% viewport, etc etc).

    - Header and footer
    There should also be a header component, to serve as a nice banner across the top, with a nice gradient color for a background. The header will also have a button to expand/collapse the drawer on the left side. It will have the title of the app across the center of the header, with a beautiful mild gradient behind it. On the right side there will be a toggle button, which can either be disabled entirely (if they do not select the checkbox to add a dark theme in step 2 of the wizard),
    or it will be enabled, and will function as the light/dark mode toggle.
    
    - Routes. There will be 2 top-level routes, /setup, and /studio. Pretty self-explanatory. Each will be an entire page.
    We will have a nested router-outlet inside the left side drawer. There will be a handful of tabs on the left side of the drawer, just underneath the level of where the bottom of the header ends. Each tab will load up part of the overall theme schema. As for organizing, its still TBD, but the jist is we will have a tab for each of: Primitive, Semantic, Colors, Components, Custom Tokens, and Schema. See below for more.

**Routing, Routes, and the Route Component Specifics**</br>
### Top Level Routes:
    - /setup:
        Setup page. Top level route and component, it will be a vertical stepper, with only a few steps:
        (Each step should just be a small form field or 2, and as they fill out each field, we move downward):
        - Step 1 will ask the user whether they want to upload an existing theme, or 'start from styled mode', which will create a brand new theme object. IF the user uploads their own existing template, we will skip straight to the last step to add a name, and confirm. Else if its a brand new theme, move to step 2.
        - Step 2 will show the user a form, where they can 1. name the theme. 2. Select one of the 4 presets (Aura, Lara, Nora, Material). 3. Select/deselect a checkbox with 'Add dark mode?' so that we can add a dark mode preset. 
        - Step 3 will just be showing them a summary of their choices, and they can then hit a submit-like button that will load up the landing page! The button can say something like 'START DESIGNING!'. At this point, we will 'save' these options, generate a unique identifier for the overall schema object, and get designing!

    - /studio:designID:
        The Landing page aka design studio. This should be a top-level component, with a dual grid separated right and left. The left will be an actual drawer, and the 'right' will be the main content of the page. See components for specifics.

### Child Level Routes:

    /studio:designID/primitive
    - A section of the overall schema, top level 'primitive' object with all its props and sub props. See cmoponents below.

    /studio:designID/semantic
    - The 'semantic' section of the overall schema, top level 'semantic' prop and sub props. See components below.

    /studio:designID/colors
    - A pallete where they can tweak colors, define the overall color pallettes, create new pallets based on colors. more TBD, see components below.

    /studio:designID/components
    - A whole list of every single component available from PrimeNG. It should be a dropdown list, and when the user selects a component, the list will auto-close, and beneath it, we will render a signal form that has all of the possible token values that they can change to actually style the components specifically. See components below.

    /studio:designID/custom
    - This will be a list of rows. Underlying structure is a SignalForm Array. Each row will consist of 3 fields - the first is the custom token name (form field) which will be a text input. The second will be the 'type' field. A dropdown/select list where they can select only one of a bunch of predefined values - 'Text', 'Color' (a color picker will render), 'Number', 'Condition' (boolean), and I can't think of anything else but will add more later. And once they select a value from the select list, a 3rd form field will then appear. It will be title 'value', and will directly correlate with the type they selected in the second field. At the far right of the row, will be a 'delete' red button (when clicked, delete the entire row altogether), and an 'add' icon button, which will immediately create another row in its default state. More on this later. See components.

    /studio:designID/schema
    - The schema will be a readonly, visual representation of the entire config object that they are building, in its current state, using a PrimeNG Tree component. The tree will NOT be expanded, it will be collapsed, and we will add two buttons - 'Expand All', and 'Collapse All', self-explanitory. See components.

**Components**

    - StudioHeader.ts: The header component should have a default background color of a nice, smooth gradient. The title centered across the header. Left side there should be a drawer (maybe hamburger menu) icon button that will toggle the drawer open/closed. On the right side, there will be a dark/light mode toggle button, which will either be disabled (if they do NOT choose to add a dark mode), or it will be enabled and will toggle based on state.

    - StudioFooter.ts: Social media links, the same nice gradient as the header, but in opposite colors. We can add anything to make it look sexy. Social links, centered with icons, for linkedin, github, and my portfolio website. Companion text to make it look professional, I will let the agent decide.

    - ThemeToggleButton.ts: the wrapper that renders the disabled/enabled light/dark mode toggle switch.  The component will have a moon face emoji to the left of the button when its dark mode, along with the text 'DARK', then the toggle button (the button itself should not have text, and instead wil be a dark mode icon).. Then to the right of the button, will be the text 'LIGHT', followed by a sun face emoji for light mode. Flex, center everything. on both axes.

    - Setup.ts: a horizontal stepper, with form field that will walk them through the setup workflow. Step 1, 2, and 3. Already implemented.

    - StudioShell.ts: The landing page, aka studio! This component will actually render one big page. Since the drawer on the left is technically not part of anything (high z-index), the studio compoennt will take up 100% of its available space on the right, based on the width of the drawer when its opened. The drawer will take up 40 vw when you click the toggle button to open it, but it will also be draggable to 60 percent MAX. We still have to plan this, but the jist as of right now, is that on the main content of the 'right' side (which is the entire page), we will have some mechanism (probably just buttons) that when clicked on, will load up either the KitchenSink component, the Dashboard component, The TableComponent, or some variety. The buttons correspond to full pages (using a bunch of components together), and besides the kitchen sink and dashboard, they will be grouped together by similarity. Each time you click a button, we load a bunch of example components, so the user can see what their theme looks like.

    - StudioDrawer.ts: The left drawer. It will consist of the tabs (for nav and for loadig the child routes), and will show the editable options for each subschema. We will have the master schema, which will be either a linkedSignal or a computed. The parent most computed signal will have ALL of the properites of the entire schema object, by way of combining the subschema that is a part of each tab/group. Still TBD on exactly how to split up the subschemas. The idea behind slicing it up  is to not overwhelm the user with a gigantic long component that has EVERYTHING, we want to let them edit by groups. The drawer should be vertically scrollable since we will be dealing with a lot of options to edit. At the very top of the drawer (probably above the actual tabs), and centered far right, will be 3 buttons.

        Buttons - UPDATE SCHEMA
        The furthest right will be 'UPDATE SCHEMA', which will run change detection to update the colors of the components and the page. Since we don't want to go crazy with change detection cycles, lets add a debounce time to the update button, so that when you click it, the inside of the button will go from haing text, to having an indeterminat spinner that is on a 3 second time. It will spin for 3 seconds, before you can interact with it again.
        
        Buttons - RESET
        The button to the left of the update button will be a menu button. In its untouched or reset state, it will simply have a little dropdown arrow icon in it, with the text 'RESET' to the left of the arrow. You will be able to choose one of the 4 preset bases (Aura, Nora, Lara, Material). When you click the button, it will go from a dropdown arrow icon and text, to an open menu, and if you select one of the presets, the menu will close automatically, and the text in the button will say 'RESET', and will immediately have a small 'x' icon in place of the dropdown arrow, so that you can reset the button state if you decide you don't want to reset. If you click that 'x', it will unload the preset name from memory, and change the 'x' back to the arrow icon, with the text unchanged. If you do not click the 'x', and choose to click the entire button again, it will pop up a modal saying something like 'Reset to ${themeName}?'. If you click Cancel, the modal closes and the button restores to its original state. If you choose yes, we load the application state as if you had just finished filling the form out.

        Buttons - EXPORT
        The export button will do just that! It will take the subschemas, spread them into the big main schema, and will auto download that schema file right to your browser. Once it exports, it will not affect the state of the application in case they want to keep going - nothing will happen at all and they can continue to make edits, or reset, or leave.

