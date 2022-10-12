import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
//import createAccount from 'database/createGuestAccount';
import { User } from 'entities';

export const createGuestAccount = catchErrors(async (_req, res) => {
  const user = await User.findOne( {where: {"UserId": 1}}); 
  if (user ==null)
  {
    /*
    const userguest=await createAccount();
    res.respond({
      authToken: signToken({ sub: userguest.UserId }),
    });
    */
    return;
  }
  res.respond({
    authToken: signToken({ sub: user.UserId }),
  });
});
