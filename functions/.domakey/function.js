const tmplBody = `import { Router } from 'express';
import createApi from '../common/createApi';
// import { yourRoute  } from './yourRoute';

const {{fnName}}Router = Router();

// {{fnName}}Router.get('/', yourRoute);

export default createApi({{fnName}}Router);
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fnName = cliArgs[0] || (await makey.ask('Function name:'));

  if (!fnName) makey.print('Error, must supply function name');
  
  const bodyFilled = makey.templateReplace(
    tmplBody,
    { fnName },
  );
  
  if (!makey.editFile(
    './src/index.ts',
    (oldIndex) => oldIndex.replace(
      /\/\/ function imports:([\s\S]*?)[\r\n][\r\n]/,
      `// function imports:$1
import ${fnName}App from './${fnName}';\n\n`,
    ).replace(
      /;[\r\n]*$/,
      `;\nexport const ${fnName} = functions.https.onRequest(${fnName}App);\n`,
    ),
  )) return;

  makey.createFile(
    `./src/${fnName}/index.ts`,
    bodyFilled,
  );
}
