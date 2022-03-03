import { MainBreadcrumbs } from './types'

interface MainBreadcrumbsState {
  Infos: Array<MainBreadcrumbs>
  Active: MainBreadcrumbs
}

const HomePageBreadcrumbs = {
  menuId: '00000000-0000-0000-0000-000000000000',
  icon: 'home',
  label: 'Home',
  target: '/',
  caption: 'Home Page',
  level: 0
}

function state (): MainBreadcrumbsState {
  return {
    Infos: [HomePageBreadcrumbs],
    Active: HomePageBreadcrumbs
  }
}

export {
  state,
  MainBreadcrumbsState,
  HomePageBreadcrumbs
}
