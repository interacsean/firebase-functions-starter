const tmplBody = `import { Request, Response } from 'express';
import respondCaughtError from '../common/respondCaughtError';
// import respondValidationErrors from '../common/respondValidationErrors';
// import { body } from 'express-validator/check';

export const validation = [
  // yourValidations
  // respondValidationErrors,
];

export const route = (req: Request, res: Response) => {
  Promise.resolve(replaceWithYourRouteBody)
    .then((response: any) => res.send(response))
    .catch(respondCaughtError(res))
};
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const fnName = cliArgs[0] || (await makey.ask('Function name:'));
  const rtName = cliArgs[1] || (await makey.ask('Route name:'));

  if (!fnName) makey.print('Error, must supply function name as arg 1');
  if (!rtName) makey.print('Error, must supply route name as arg 2');

  const httpMethodResp = await makey.ask('HTTP method? (G)ET, (P)OST, (U)PDATE, (D)ELETE, PU(T):');
  const httpMethod = httpMethodResp.length === 1
    ? ({G: 'get', P: 'post', U: 'update', D: 'delete', T: 'put'})[httpMethodResp.toUpperCase()]
    : httpMethodResp;

  if (!httpMethod) throw new Error('Invalid response for HTTP method');

  const endpoint = await makey.ask(`Endpoint name (default: \`/${rtName}\`):`) || `/${rtName}`;
  
  const useVal = await makey.askYN('Use validation?');

  if (!makey.editFile(
    `./src/${fnName}/index.ts`,
    (oldIndex) => {
      const rtVal = useVal ? `${rtName}Val, ` : '';

      return oldIndex.replace(
        /\/\/ route imports:([\s\S]*?)[\r\n][\r\n]/,
        `// route imports:$1
import { route as ${rtName}Route, validation as ${rtName}Val } from './${rtName}';\n\n`,
      ).replace(
        /[\r\n]export default createApi/,
        `${fnName}Router.${httpMethod}('${endpoint}', ${rtVal}${rtName}Route);\n\nexport default createApi`,
      );
    },
  )) return;

  makey.createFile(
    `./src/${fnName}/${rtName}.ts`,
    tmplBody,
  );
}
