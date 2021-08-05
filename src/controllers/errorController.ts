import { Request, Response, NextFunction } from "express";

export class ErrorController {

  async get404(req: Request, res: Response, next: NextFunction) {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
  }

}
