#!/usr/bin/env node
import '@repositionit/shared/bootstrap';
import * as instance from '@repositionit/shared/http/server';

(async () => {
  await instance.use(require('@repositionit/ui/service'));
  await instance.prepare();
  await instance.listen(
    Number(process.env.UI_PORT ? process.env.UI_PORT : process.env.PORT),
    String(process.env.UI_HOST ? process.env.UI_HOST : process.env.HOST)
  );
})();
