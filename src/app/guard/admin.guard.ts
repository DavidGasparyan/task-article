import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {UserTypes} from "../enums/user-types.enum";

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.user?.type === UserTypes.ADMIN) {
    return true;
  }

  return router.navigate(['/articles']);
};
