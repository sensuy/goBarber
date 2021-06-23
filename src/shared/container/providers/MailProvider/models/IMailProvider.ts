import ISendMailDTO from '../dtos/ISendMailDTO';

interface IMailProvide {
 sendMail(data: ISendMailDTO): Promise<void>
}

export default IMailProvide;
