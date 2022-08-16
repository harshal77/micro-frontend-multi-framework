import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  WebComponentWrapper, WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';

const routes: Routes = [
  {
    path: 'angular',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './angularMFE'
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
  {
    path: 'react1',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './react-component-1',
      elementName: 'react-component-1',
    } as WebComponentWrapperOptions,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


