import * as migration_20260809_101527_initial from './20260809_101527_initial';
import * as migration_20260818_065406_add_media_blur_data_url from './20260818_065406_add_media_blur_data_url';
import * as migration_20260823_105500_backfill_media_blur from './20260823_105500_backfill_media_blur';
import * as migration_20260823_113500_backfill_media_blur_from_blob from './20260823_113500_backfill_media_blur_from_blob';
import * as migration_20260823_121446_add_site_settings_homepage_images from './20260823_121446_add_site_settings_homepage_images';
import * as migration_20260823_130950_add_site_settings_about_copy from './20260823_130950_add_site_settings_about_copy';

export const migrations = [
  {
    up: migration_20260809_101527_initial.up,
    down: migration_20260809_101527_initial.down,
    name: '20260809_101527_initial',
  },
  {
    up: migration_20260818_065406_add_media_blur_data_url.up,
    down: migration_20260818_065406_add_media_blur_data_url.down,
    name: '20260818_065406_add_media_blur_data_url',
  },
  {
    up: migration_20260823_105500_backfill_media_blur.up,
    down: migration_20260823_105500_backfill_media_blur.down,
    name: '20260823_105500_backfill_media_blur',
  },
  {
    up: migration_20260823_113500_backfill_media_blur_from_blob.up,
    down: migration_20260823_113500_backfill_media_blur_from_blob.down,
    name: '20260823_113500_backfill_media_blur_from_blob',
  },
  {
    up: migration_20260823_121446_add_site_settings_homepage_images.up,
    down: migration_20260823_121446_add_site_settings_homepage_images.down,
    name: '20260823_121446_add_site_settings_homepage_images',
  },
  {
    up: migration_20260823_130950_add_site_settings_about_copy.up,
    down: migration_20260823_130950_add_site_settings_about_copy.down,
    name: '20260823_130950_add_site_settings_about_copy'
  },
];
