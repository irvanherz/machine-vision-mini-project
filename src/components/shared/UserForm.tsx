import { Form, Input, Select } from 'antd'

export default function UserForm () {
  return (
    <Form.Provider>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required!' }]}>
        <Select
          placeholder="Title"
          options={[
            { value: 'mr', label: 'Mr' },
            { value: 'mrs', label: 'Mrs' },
            { value: 'miss', label: 'Miss' }
          ]}
        />
      </Form.Item>
      <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'First name is required!' }]}>
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Last name is required!' }]}>
        <Input placeholder='Last Name' />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Email is required!' }]}>
        <Input placeholder='Email...' />
      </Form.Item>
      <Form.Item name="picture" label="Picture URL">
        <Input placeholder='Last Name' />
      </Form.Item>
    </Form.Provider>
  )
}
