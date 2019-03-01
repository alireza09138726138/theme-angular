import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SettingComponent } from './components/setting/setting.component';
import { MainComponent } from './components/main/main.component';
import { uiRouterConfigFn, Routes } from './app-routing.module';
import { UIRouterModule } from '@uirouter/angular';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UIRouterModule.forRoot({
      states: Routes,
      config: uiRouterConfigFn
}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
