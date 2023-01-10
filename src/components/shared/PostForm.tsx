import { Form, Input, InputNumber, Select } from 'antd'
import UserSelector from '../PostCreateButton/UserSelector'

export default function UserForm () {
  return (
    <Form.Provider>
      <Form.Item name="owner" label="Owner" rules={[{ required: true, message: 'Owner are required!' }]}>
        <UserSelector placeholder="Select Owner" />
      </Form.Item>
      <Form.Item name="text" label="Text" rules={[{ required: true, message: 'Text are required!' }]}>
        <Input.TextArea rows={5} placeholder='Text' />
      </Form.Item>
      <Form.Item name="image" label="Image">
        <Input placeholder='Image URL' />
      </Form.Item>
      <Form.Item name="likes" label="Likes" rules={[{ required: true, message: 'Likes are required!' }]}>
        <InputNumber min={0} max={Number.MAX_SAFE_INTEGER} style={{ width: '100%' }} placeholder='Likes' />
      </Form.Item>
      <Form.Item name="tags" label="Tags" rules={[{ required: true, message: 'Tags are required!' }]}>
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Tags..."
  />
      </Form.Item>
    </Form.Provider>
  )
}
