const CrudController = require('./crud');

class UserController extends CrudController {
    constructor(userService, postService) {
        super(userService);

        const PostController = require('./post')(postService);
        this.router.use('/:userId/posts', PostController);

        this.registerRoutes();
    }
}

module.exports = (userService, postService) => {
    const controller = new UserController(userService, postService);
    return controller.router;
}