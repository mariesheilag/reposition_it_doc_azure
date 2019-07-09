#!/usr/bin/env node
import '@repositionit/shared/bootstrap';
import * as instance from '@repositionit/shared/http/server';

(async () => {
  await instance.use(require('@repositionit-services/booking'));
  await instance.use(require('@repositionit-services/session'));
  await instance.use(require('@repositionit/ui/service'));
  await instance.prepare();
  await instance.listen(Number(process.env.PORT), String(process.env.HOST));
})();
