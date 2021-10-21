class Exception extends Error {
  status = 500;
  constructor(message: string) {
    super(message);
  }
}

export default function exception(message: string, status: number) {
    const error = new Exception(message)
    status && (error.status = status);
    return error
 }