export interface DefaultSuccessResponse <T> {
  success: boolean,
  message?:string,
  result: T
}
