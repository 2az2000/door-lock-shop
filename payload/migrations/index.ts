import * as migration_20260809_101527_initial from './20260809_101527_initial';
import * as migration_20260818_065406_add_media_blur_data_url from './20260818_065406_add_media_blur_data_url';
import * as migration_20260823_105500_backfill_media_blur from './20260823_105500_backfill_media_blur';

export const migrations = [
  {
    up: migration_20260809_101527_initial.up,
    down: migration_20260809_101527_initial.down,
    name: '20260809_101527_initial',
  },
  {
    up: migration_20260818_065406_add_media_blur_data_url.up,
    down: migration_20260818_065406_add_media_blur_data_url.down,
    name: '20260818_065406_add_media_blur_data_url'
  },
  {
    up: migration_20260823_105500_backfill_media_blur.up,
    down: migration_20260823_105500_backfill_media_blur.down,
    name: '20260823_105500_backfill_media_blur'
  },
];
