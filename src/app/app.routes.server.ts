import { RenderMode, ServerRoute } from '@angular/ssr';
import { routesIDs } from './shared/routes-ids';

export const serverRoutes: ServerRoute[] = [
   {
    path: 'menu/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return routesIDs.map(id => ({ id }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
