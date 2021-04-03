/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { ResourceUser } from '../models';
import {   IFile} from '../interfaces';

/**
 *
 * The repository of resources
 * @category Repositorys
 * @class ResourceRepository
 * @implements {ICrud<IResourceExample, string>}
 */
class ResourceUserRepository{
    async getFileById(_idUser:string, _idFile:string): Promise<IFile | null>  {
        const user = await ResourceUser.findById(_idUser);
        if(user){
          return user.directory.filter(file => file._id == _idFile)[0];
        }
        return null
      }
}
export default new ResourceUserRepository();
