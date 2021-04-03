/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { HttpException } from '../exceptions';
import { ResourceService } from '../services';
import { Readable } from 'stream';
import { decryptFile } from '../utils';

/**
 *
 * The controller of resources
 * @category Controllers
 * @class ResourceExampleController
 */
class ResourceExampleController {
  public static async loadVideo(req: Request, res: Response, next: NextFunction){
    try{
      // const token = <IPayLoad>req.user;// paso el token
      // const user = <IUser>token.user; // recupero el usuario
      // console.log(req.headers)
      const id = req.params.id; // recupero el id
      const range = req.headers.range; //paso el rango
      const user = {
        _id:"604305a999536a12341a54cd"
      }
      console.log('Antes de get file');
      const getFile = await ResourceService.getFileById(user._id, id); // traigo objeto que contiene el video
      if(getFile){
        let pathVideo = `${process.env.FILE_STORAGE}/users/${user._id}/${getFile.url}/${getFile.name}`;//fichero que contiene el video
        if(getFile.url == "") pathVideo = `${process.env.FILE_STORAGE}/users/${user._id}/${getFile.name}`;
        console.log('Antes de cargar el archivo');
        
        const file = await decryptFile(pathVideo);// Se desifra el archivo completo
        const videoPath = file; //Buffer del archivo descifrado
        const videoSize = videoPath.length;// Tamaño del buffer en bytes
        console.log('Despues de descifrar');
        if(!range){
          console.log('No tiene rango');
          // res.send(file);
          const headers = {
            'Content-Length': videoSize,
            'Content-Type': 'video/mp4',
          }
          res.writeHead(200, headers);
          const readable = new Readable();
          readable._read = () => {} // _read is required but you can noop it
          //Se le pasa al stream el subchunk
          readable.push(file);
          //Para cada stream es necesario que lo ultimo sea null
          readable.push(null)
          //Se pasan los headers a la cabecera
          
          //Se envia el res mediante el pipe del stream redable
          res.send(file)


          // res.writeHead(200, headers)
          // const file = fs.createReadStream(pathVideo)
          // file.pipe(decipher).pipe(res);
        }
        else{
          const CHUNK_SIZE = 10 ** 6; // 1MB

          //Prueba
          const parts = range.replace(/bytes=/, "").split("-")
          const start = parseInt(parts[0], 10)
          const end = parts[1] 
            ? parseInt(parts[1], 10)
            : videoSize-1
          const contentLength = (end-start)+1
          const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
          };
          console.log('Antes del header');
          res.writeHead(206, headers);
          //Se crea un stream redable
          const readable = new Readable();
          readable._read = () => {} // _read is required but you can noop it
          //Se le pasa al stream el subchunk
          console.log('Antes de hacer pull al redable');
          readable.push(file.slice(start, end + 1));
          //Para cada stream es necesario que lo ultimo sea null
          console.log('Set null');
          readable.push(null)
          //Se pasan los headers a la cabecera
          
          //Se envia el res mediante el pipe del stream redable
          console.log('Antes del pipe');
          readable.pipe(res);
          console.log('Despues del pipe');
          
          
          
        }
      }
      else{
        throw new HttpException(404, 'Not Found');
      }
    }catch(error) {
      return next(new HttpException(error.status || 500, error.message));

    }
  }
}
export default ResourceExampleController;
