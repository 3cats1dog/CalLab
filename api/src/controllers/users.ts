import { User } from 'entities';
import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';

export const login =catchErrors(async (req, res)=> {
const {name, password } = req.body;
const user =await User.findOne({ where: { Name: name, Password: password}});

if (user != null)
{
  res.respond({
    user,
    authToken: signToken({ sub: user.UserId }),
  });
}else{
  res.respond ({
    "result": "Invalid username or password!!!"
  });
}

console.log("name is " + name + "\r\n" );

/*
console.log("name is " + name + "\r\n" );
let whereSQL = 'Name= :name';
const sql1 = await User
.createQueryBuilder("tbUser")
.where(whereSQL, { name:  `${name}`})
.getSql();
console.log(sql1);
*/
});

export const getUserWithID = catchErrors(async (req, res) => {
  const user = await User.findOne( {where: {"UserId": Number(req.params.userId)}});  
  if (user != null)
  {
    res.respond({ user });
  }
});

export const create = catchErrors(async (req, res) => {
  const user = await createEntity(User, req.body);
  res.respond({ user });
});

export const update = catchErrors(async (req, res) => {
  const user = await User.findOne({where:{"UserId": Number(req.params.userId)}});
  if (user!= null)
  {
    Object.assign(user, req.body);
    return validateAndSaveEntity(user);
  }
  res.respond({ user });
});

export const remove = catchErrors(async (req, res) => {
  const user = await User.findOne({where:{"UserId":Number(req.params.userId)}});
  if (user != null){
    user.remove();
  }
  res.respond({ user });
});


export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});
