import { ApiError } from '../libs/api'
import axiosInstance from '../libs/axios'

export default class UserService {
  static async create (setData: any) {
    try {
      const resp = await axiosInstance.post(`${process.env.REACT_APP_API_BASEURL}/data/v1/user/create`, setData)
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async findMany (filters?: any) {
    try {
      const resp = await axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/data/v1/user`, { params: filters })
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async findById (id: any) {
    try {
      const resp = await axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/data/v1/user/${id}`)
      const data = resp.data
      return { data }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: number, setData: any) {
    try {
      const resp = await axiosInstance.put(`${process.env.REACT_APP_API_BASEURL}/data/v1/user/${id}`, setData)
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: number) {
    try {
      const resp = await axiosInstance.delete(`${process.env.REACT_APP_API_BASEURL}/data/v1/user/${id}`)
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }
}
