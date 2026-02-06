import { Container } from '@needle-di/core';

import { ApplicationController } from './application.controller';
import { ApplicationModule } from './application.module';

const container = new Container();

const applicationController = container.get(ApplicationController);
const applicationModule = container.get(ApplicationModule);

export function startServer() {
  return applicationModule.start();
}

export const routes = applicationController.registerControllers();

export type ApiRoutes = typeof routes;
