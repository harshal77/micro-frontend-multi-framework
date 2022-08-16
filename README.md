# Micro frontend with Multi framework
**Important**: This code is written in Angular CLI 14** and higher.I have created a simple applictaion with basic UI. In this appilication I have created a container, MF1 -> Micro frontend one (access app module) and MFE2 -> Second Micro frontend created in react with one app component and access that in container module.

##Part 1: Steps to run

1. Clone the starterkit for this tutorial:
   https://github.com/harshal77/micro-frontend-multi-framework --branch development

2. Move into the project directory and install the dependencies of each micro fronend 

    ```
    cd angular-container
    npm i
    cd angular-mfe
    npm i
    cd react-mfe
    npm i
    ```

3. Start the container (Port 4200) app first then other micro fronends like angular-mfe (Port 4201), react-mfe (Port 4204).



## Part 2: How to add module federation


1. Install ``@angular-architects/module-federation`` into the conatiner and into the micro frontend:

    ```
        npm i @angular-architects/module-federation

    ```
    or you can simply add module federation in each app independently using following command this will ask port number and project name.
    
    ```
    npm i @angular-architects/module-federation-tools  
    ```
    this is also require when we you use react


3. Switch into the project ``angular-mfe`` and open the generated configuration file ``webpack.config.js``. It contains the module federation configuration. In the exposes object you have to add whichever module you have to expose or access other MF's ex):

    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

    module.exports = withModuleFederationPlugin({

        name: 'angular-mfe',
        filename: "remoteEntry.js",
        exposes: {
            './Module': './mfe1/src/app/app.module.ts'
        },
        shared: {
            ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
        },

    });
    ```

    Here I  exposes the ``app module`` under the Name ``./Module``. Hence, the container can use this path to load it.
    Note. If you want to expose app module make sure in routing file you have to use RouterModule.forChild(routes) istend of   RouterModule.forRoot(routes).

4. Switch into the project ``react-mfe`` and open the generated configuration file ``webpack.config.js``. It contains the module federation configuration. In the exposes object you have to add whichever module you have to expose or access other MF's ex):

    ```
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
    const CopyWebpackPlugin = require("copy-webpack-plugin");

    module.exports = withModuleFederationPlugin({

        name: "react",
        library: {
          type: "var",
          name: "react"
        },
        filename: "remoteEntry.js", // <-- Meta Data
        exposes: {
          './web-components': './app.js',
          './react-component-1': './reactComponentOne.js',
        },
        shared: ["react", "react-dom"]
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: './*.html'
        }]
      })
    ],
    devServer: {
      port: 4204
    }

    });
    ```
4.1) Need to add some extra webpack packages for react.

     ```
     npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server babel-loader
    ```
    

5. We can access angular-mfe module two ways in container applictaion.

  
5.1) Switch into the ``angular-mfe`` app and open the file ``webpack.config.js``
    ```
    new ModuleFederationPlugin({
        library: { type: "module" },

        name: "mfe1",
        filename: "remoteEntry.js",
        exposes: {
            './angularMFE': './src/app/app.module.ts',
        },          

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    ```


5.2) Switch into the ``Container`` app and open the file ``routing file``

    ```
    {
    path: 'mfe-1',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './MF1'
      })
        .then((m: any) => m.AppModule)
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
    ```



    Please note that the imported URL consists of the names defined in the configuration files above.
  

## Part 3: Try it out

Now, let's try it out!

1. Start the ``angular-container``,  ``angular-mfe`` and ``react-mfe`` side by side:

    ```
    ng serve angular-container -o
    ng serve angular-mfe -o
    npm start (for react app)
    ```


4. The container should still be able to load the micro frontend.
https://webpack.js.org/concepts/module-federation/
