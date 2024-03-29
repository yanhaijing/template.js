const path = require('path');
const { exec } = require('child_process');
const ora = require('ora');
const pkg = require('../package.json');
const { checkProjectExists, copyDir } = require('./util');

function init(argv, answers) {
  const cmdPath = process.cwd();
  const { name, type, manager } = Object.assign({}, argv, answers);

  const pathname = String(typeof argv._[1] !== 'undefined' ? argv._[1] : name);

  const option = {
    pathname, // 创建的名字
    type,
    manager,
    version: pkg.version,
  };

  // 运行命令
  if (!pathname) {
    console.error('error: template create need name');
    return;
  }

  if (checkProjectExists(cmdPath, pathname) && !argv.force) {
    console.error(
      'error: The project is already existed! If you really want to override it, use --force argv to bootstrap!',
    );
    return;
  }

  const map = {
    webpack5: initwebpack5,
    webpack4: initwebpack4,
    rspack: initrspack,
    vite: initvite,
    rollup: initrollup,
    esbuild: initesbuild,
    parcel1: initparcel1,
    parcel2: initparcel2,
    fis3: initfis3,
    browserify: initbrowserify,
    gulp: initgulp,
    browser: initbrowser,
  };

  if (map[type]) {
    map[type](cmdPath, option);
  } else {
    console.error('error: template create type invalid');
  }
}

exports.init = init;

function initManager(cmdPath, option) {
  const manager = option.manager;
  const pathname = option.pathname;

  if (!manager) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    const spinner = ora();

    spinner.start(`Installing packages from npm, wait for a second...`);

    exec(
      `${manager} install`,
      {
        cwd: path.resolve(cmdPath, pathname),
      },
      function (error) {
        if (error) {
          reject(`安装依赖失败: ${error}`);
          return;
        }
        spinner.succeed(`Install packages successfully!
            `);
        resolve();
      },
    );
  });
}

function initwebpack5(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/webpack5/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initwebpack4(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/webpack4/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initrspack(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/rspack/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initvite(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/vite5/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initrollup(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/rollup4/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initesbuild(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/esbuild/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initparcel1(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/parcel1/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initparcel2(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/parcel2/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initfis3(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/fis3/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initbrowserify(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/browserify/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initgulp(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/gulp/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}

function initbrowser(cmdPath, option) {
  const { pathname } = option;

  copyDir(
    path.resolve(__dirname, `../template/browser/base`),
    path.resolve(cmdPath, pathname),
  );

  initManager(cmdPath, option).then(() => {
    const spinner = ora();
    spinner.succeed('Create project successfully');
  });
}
