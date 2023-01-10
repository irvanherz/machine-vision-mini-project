import { List } from 'antd'
import styled from 'styled-components'
import PostCard from '../PostCard'

const StyledList = styled(List)`
.ant-list-item {
  padding: 0;
  margin: 0;
}
`
type PostCardGridListProps = {
  posts: any[]
}

export default function PostCardGridList ({ posts }: PostCardGridListProps) {
  return (
    <StyledList
      grid={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 6, gutter: 16 }}
      dataSource={posts}
      renderItem={post => (
        <List.Item>
          <PostCard post={post} />
        </List.Item>
      )}
    />
  )
}
