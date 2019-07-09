// tslint:disable-next-line: no-var-requires
require('dotenv').config();

if (process.getuid() === 0) {
  // console.error('Aborting startup because this process is running as root.');
  // process.exit(1);
}
