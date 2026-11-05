/**
 * Ambient declarations for dependencies that ship no types and have no `@types/*`
 * package installed in this project. `package.json` is outside this module's scope; a
 * bare `declare module "x";` (TypeScript's own suggested fix for TS7016) is what actually
 * silences the "implicitly has an 'any' type" error for a module that does resolve to a
 * real file on disk but carries no types of its own.
 *
 * `Express.Multer.File` is declared directly (not inside `declare global`): this file has
 * no top-level `import`/`export`, so it is already global scope, and a plain top-level
 * `namespace Express` merges with `@types/express`'s the way `declare global` does not
 * from a script (non-module) ambient file.
 */
declare module "bcrypt";
declare module "passport-jwt";
declare module "multer";

namespace Express {
  namespace Multer {
    interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination?: string;
      filename?: string;
      path?: string;
      buffer: Buffer;
    }
  }
}
