import {
  NextFunction, Request, Response, Router,
} from 'express';
import { StreamVideoController } from '../controller';

/**
 *
 * Managament the routes of resource
 * @category Routes
 * @class ExampleRouter
 * @implements {IRoute}
 */
class ExampleRouter  {
  public router = Router();

  public pathIdParam = '/:id';

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {
    this.router.get(
      `/:id/:ud`,
      // passport.authenticate('jwt',{session:false}),
      (req: Request, res: Response, next: NextFunction) => StreamVideoController
      .loadVideo(req, res, next)
    );
  }
}
export default new ExampleRouter().router;
