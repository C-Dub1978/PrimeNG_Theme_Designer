# Theme Designer Project

**High Level**</br>

    This application will be used to create a user friendly, theme designer for creating and importing/exporting a .ts file that you can pass into your application's providePrimeNg() in the Angular app config. The application itself should support tablet, and desktop sizes (varying. No mobile as this is something that needs to be done on a bigger screen to fit everything). It should be an Angular 22 application, with routing, scss, PrimeNG without any tailwind or css libraries/frameworks, and should be ready to update to PrimeNG 22 when they release it any day now.  

    The core of the application will consist of 2 ideas. The first is there will be a view where you can import a saved config, or start a brand new config. From this choice, we will load up a landing page, which will be the core of the application. What we will need, is to create a schema that represents every single token that could possibly go into a PrimeNG config. That schema will be used as a giant signal form for input, and each token will be editable and its value will depend on the type (hex values for colors, strings, numbers, etc etc). We should break this whole big form down into sections, to be determined when we have an idea of what the overall schema looks like. The point is to be able to give the user the power to completely customize every last token that PrimeNG allows us to pass in its config. Keep in mind that a PrimeNG configuration always extends from a base, such as 'Aura' base, 'Nora', 'Material', etc. As the user changes the token values, we should be updating our underlying PrimeNG config dynamically.
    
    There should be a nested router-outlet (right side of page), that will show a view that is separated into multiple tabs. Each view inside that nested router-outlet will show a bunch of grouped PrimeNG components, with the point being that the user can see how updates to their config affect all of the different components that PrimeNG offers. We should group these components based on their similarity, and when the user clicks the different tabs, it loads up groups of different components. For instance you could have one tab that is 'Form Fields', and it would show all of the different form fields that PrimeNG gives you. Another tab could be for interactive components, i.e. accordians, modals, select boxes, and anything else that is interactive. Another tab could be for tables specifically, where we show the user all of the different PrimgeNG components that encompass a table.
    
    The app routing should consist of multiple routes, all lazy loaded standalone components for each route definition, and there should be both a wildcard route, as well as a fallback route if no other routes are found for it in the router. For starters, we will start out with the following routing structure:
    
    - landing page (left side of the screen) split into two sections. The left section will be where the user edits all the differnt token values, and the right section will be reserved for which group of components they want to view. This overall view will be a nice grid system, with widths and such to be determined.
    - view schema page. This view will be at the same level as the landing page, and it would just pretty-print what your current schema, with all the current values looks like at that moment in time.
    
    Child routes - There should be a nested router-outlet on the right side of the landing page, to allow the user to switch through the different tabs, where they can view all the different types of PrimeNG components. Specifics TBD, based on how we can logically group similar components together. 
    
    There should also be a header component, to serve as a nice banner across the top, with a nice gradient color for a background. In this component there should be a light/dark mode toggle button/switch, to do just that: toggle light/dark mode. The toggle button/switch can be disabled though. When the user is on the left side of the landing page, one of the top-level form fields will be a checkbox for 'also add dark theme?'. Only toggle between light and dark mode if this form field is selected, otherwise it wil be assumed that the user only wants 1 single light mode (or default mode we can call it).

**What Problems Are We Trying To Solve**
    For starters, it is intimidating to many users to take a look at the base config object that allows you to change the tokens that make the application look the way it does (colors, sizes, etc). The main goal here is to provide one big schema object, that allows you to customize the value of ANY of the tokens that go into the object that you pass to providePrimeNg() - and wrap that object into a huge angular signal form (with plenty of subforms). 
    Next we want to provide something open source that lets you design a custom theme, quickly and that updates the view in realtime to apply your changes instantly... without having to pay for a subscription.

**Steps**
    - First, build the application routing structure. See below for details.
    - Core shell components setup.
    - Component discovery and state mapping.
    - Forms.

**Routing, Routes, and the Route Component Specifics**
##### Top Level Routes:
    - /setup:
        Setup page. Top level route and component, it will be a vertical stepper, with only a few steps:
        (Each step should just be a small form field or 2, and as they fill out each field, we move downward):
        - Step 1 will ask the user whether they want to upload an existing theme, or 'start from styled mode', which will create a brand new theme object. IF the user uploads their own existing template, we will skip straight to the last step to add a name, and confirm. Else if its a brand new theme, move to step 2.
        - Step 2 will show the user a form, where they can 1. name the theme. 2. Select one of the 4 presets (Aura, Lara, Nora, Material). 3. Select/deselect a checkbox with 'Add dark mode?' so that we can add a dark mode preset. 
        - Step 3 will just be showing them a summary of their choises, and they can then hit a submit-like button that will load up the landing page! The button can say something like 'START DESIGNING!'. At this point, we will 'save' these options, generate a unique identifier for the overall schema object, and get designing!d

    - /studio:designID:
        The Landing page. This should be a top-level component, consisting of a header, main content, and a footer. The landing page is what houses all of the innards of the application. The main content inbetween the header and footer will be a full page where the user can build their design, view the tree structure (read only) of the output object, play with color picking/colors, play with utility stuff, etc.
        The main content area between the header and footer, will simply be a <router-outlet>.

        The Header component will have a nav-bar, positioned in the center, at the bottom of the header. The navbar should actually be a set of tabs,
        rather than a set of plain anchor links. We will use prime components to style the tabs. Each tab will lazy load a child route/component directly inside the child router-outlet. One of the requirements for this is that data needs to persist between switching between the tabs/components. We should probably create a global service to handle that, via signal forms, etc. The tab titles will be the following (and then see below for component descriptions): 'Primitive', 'Semantic', 'Colors', 'Components', 'Samples', 'Schema', and 'Custom Tokens'.
    

##### Child Level Routes:

    /studio:designID/primitive
    - The entire tree structure of the

    /studio:designID/semantic
    - 

    /studio:designID/colors
    - A pallete where they can tweak colors, define the overall color pallettes, create new pallets based on colors. more TBD

    /studio:designID/components
    - A whole list of every single component available from PrimeNG. It should be a dropdown list, and when the user selects a component, the list will auto-close, and beneath it, we will render a signal form that has all of the possible token values that they can change to actually style the components specifically.

    /studio:designID/samples
    - The samples component will be where they can view exactly how their current custom theme looks like inside every single one of the PrimeNG components. To prevent a cumbersom, long list that they would have to scroll forever, I want the content to be tabbed. Each tab will show a bunch of related components, and they will be able to interact with the components that are interactable. Grouping will just follow a logical order, with tabs housing the grouped components. Looking at the PrimeNG website, on their 'components' section, on the left side is a long list of groups of components, and inside each group you can select an individual component, click on it, and it will load it into the page. We will follow this structure, but instead of a list of groups, we will have a tab for each group. I am sure there is a way to use their API or MCP server to get a list of all groups, and all the components in each group, so I won't manually paste everything in here, but here are a few examples. The first group in their list is 'Form', and some of the components inside that group list are 'Autocomplete', 'CascadeSelect', 'Chekcbox', 'ColorPicker', etc etc. The next group (tab for us) is 'Button', and its component list has 'Button', 'SpeedDial', and 'SplitButton'. Follow this same structure in our app.
    
    /studio:designID/schema
    - The schema will be a readonly, visual representation of the entire config object that they are building, in its current state, using a PrimeNG Tree component. The tree will NOT be expanded, it will be collapsed, and we will add two buttons - 'Expand All', and 'Collapse All', self-explanitory.

    /studio:designID/customtokens
    - This will be a list of rows. Underlying structure is a SignalForm Array. Each row will consist of 3 fields - the first is the custom token name (form field) which will be a text input. The second will be the 'type' field. A dropdown/select list where they can select only one of a bunch of predefined values - 'Text', 'Color' (a color picker will render), 'Number', 'Condition' (boolean), and I can't think of anything else but will add more later. And once they select a value from the select list, a 3rd form field will then appear. It will be title 'value', and will directly correlate with the type they selected in the second field. At the far right of the row, will be a 'delete' red button (when clicked, delete the entire row altogether), and an 'add' icon button, which will immediately create another row in its default state. More on this later.

**Components**

    - Header.ts: The header component should have a default background color of a nice, smooth gradient, based on the current state of the theme. It should have the child links, for the child routes in a nice, centered horizontal nav-bar. Dummy lorum ipsum text to start.

    - Footer.ts: mocked social media links, the same nice gradient as the header, but in opposite colors. We can add anything to make it look sexy, TBD later.

    - Setup.ts: a vertical stepper, with form field that will walk them through the setup workflow.


    - Studio.ts: The landing page!