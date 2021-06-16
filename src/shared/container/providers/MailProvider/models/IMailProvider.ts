interface IMailProvide {
 sendMail(to: string, body: string): Promise<void>
}

export default IMailProvide;
