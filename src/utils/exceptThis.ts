import exception from './exception';
export default function except(condition: any, message: string, status: number) {
    if(!condition) {
         throw exception(message, status)
     }
     return true;
 }