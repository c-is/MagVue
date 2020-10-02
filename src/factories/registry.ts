import { browserDetect } from '../utils/globals';

const defaultStatus = {
  isLoaded: false,
  isAjaxActive: false,
  isMenuOpen: false,
  isMobile: process.browser && browserDetect().mobile,
  slug: null,
  type: null,
  page: null,
  current: null,
  view: null,
  pagePosition: 0,
};

const defaultGlobals = {
  w: process.browser ? window.innerWidth : 0,
  h: process.browser ? window.innerHeight : 0,
  doc: process.browser ? document.documentElement : null,
};

const registry = {
  status: defaultStatus as { [key: string]: any },
  globals: defaultGlobals as { [key: string]: any },
  components: {} as { [key: string]: ClassDecorator },
  widgets: {} as { [key: string]: ClassDecorator },
  mainImagePosition: 'centre',
};

/* eslint-disable */
export default {
  registerWidget,
  getWidget,
  getWidgetAll,
  registerComponent,
  resetComponent,
  getComponent,
  registerStatus,
  getStatus,
  getStatusAll,
  registerGlobal,
  getGlobal,
  getGlobalAll,
};
/* eslint-enable */

/**
 *  Widgets
 */

export function registerWidget(widgetName: string, widget: ClassDecorator) {
  registry.widgets[widgetName] = widget;
}

export function getWidget(widgetName: string) {
  const widget = registry.widgets[widgetName];
  if (!widget) {
    console.error(`${widgetName} doesn't exist!`);
  }

  return registry.widgets[widgetName];
}

export function getWidgetAll() {
  return registry.widgets;
}

/**
 *  Components
 */

export function registerComponent(componentName: string, component: ClassDecorator) {
  registry.components[componentName] = component;
}

export function resetComponent() {
  registry.components = {};
}

export function getComponent(componentName: string) {
  const component = registry.components[componentName];
  if (!component) {
    console.warn(`${componentName} doesn't exist!`);
  }

  return registry.components[componentName];
}

/**
 *  Status
 */

export function registerStatus(statusName: string, condition: any) {
  registry.status[statusName] = condition;
}

export function registerStatusAll(statuses: { [key: string]: any}[]) {
  registry.status = {
    ...registry.status,
    ...statuses,
  };
}

export function getStatus(statusName: string) {
  return registry.status[statusName];
}

export function getStatusAll() {
  return registry.status;
}

/**
 *  Globals
 */

export function registerGlobal(name: string, value: any) {
  registry.globals[name] = value;
}

export function getGlobal(name: string) {
  const globalValue = registry.globals[name];
  if (!globalValue) {
    console.error(`${name} doesn't exist!`);
  }

  return globalValue;
}

export function getGlobalAll() {
  return registry.globals;
}
