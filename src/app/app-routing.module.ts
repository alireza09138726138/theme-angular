import { UIRouter } from '@uirouter/angular';
import { MainComponent } from './components/main/main.component';
import { SettingComponent } from './components/setting/setting.component';

export const Routes: object[] = [{
  name: 'main',
  url: '/',
  component: MainComponent
}, {
  name: 'setting',
  url: '/setting',
  component: SettingComponent
}];

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter) {
  // If no URL matches, go to the `main` state by default
  router.urlService.rules.otherwise({ state: 'main' });
}
