/* eslint-disable class-methods-use-this */
import { IFile } from '../interfaces';
import { ResourceUserRepository } from '../repository';
import { ResourceUser } from '../models';

/**
 *
 * The resource service,layer of repository pattern
 * @category Services
 * @class ResourceService
 */
class ResourceService  {
   /**
   * return file by id
   * @param {String} _idUser id of user
   * @param {String} _idFile id of file
   * @returns {Promise<IFile | null>} file if exist, else null
   */
    async getFileById(_idUser:string, _idFile:string): Promise<IFile | null> {
      return await ResourceUserRepository.getFileById(_idUser,_idFile);
    }
}

export default new ResourceService();
