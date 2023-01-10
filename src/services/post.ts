import { ApiError } from '../libs/api'
import axiosInstance from '../libs/axios'

export default class PostService {
  static async create (setData: any) {
    try {
      const resp = await axiosInstance.post(`${process.env.REACT_APP_API_BASEURL}/data/v1/post/create`, setData)
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async findMany (filters?: any) {
    try {
      const resp = await axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/data/v1/post`, { params: filters })
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async findById (id: any) {
    try {
      const resp = await axiosInstance.get(`${process.env.REACT_APP_API_BASEURL}/data/v1/post/${id}`)
      const data = resp.data
      return { data }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async updateById (id: any, setData: any) {
    try {
      const resp = await axiosInstance.put(`${process.env.REACT_APP_API_BASEURL}/data/v1/post/${id}`, setData)
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }

  static async deleteById (id: any) {
    try {
      const resp = await axiosInstance.delete(`${process.env.REACT_APP_API_BASEURL}/data/v1/post/${id}`)
      const { data, ...meta } = resp.data
      return { data, meta }
    } catch (err) {
      throw new ApiError(err)
    }
  }
}
