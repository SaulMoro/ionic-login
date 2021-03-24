export enum LoadingState {
  init = 'init',
  loading = 'loading',
  refreshing = 'refreshing', // Rehydrating data
  prefetching = 'prefetching',
  loaded = 'loaded',
}

export interface ErrorState {
  error: unknown;
}

export type DataState = LoadingState | ErrorState;

export const isLoading = (dataState: DataState): boolean => dataState === LoadingState.loading;
export const isLoadingOrRefreshing = (dataState: DataState): boolean =>
  isLoading(dataState) || dataState === LoadingState.refreshing;
