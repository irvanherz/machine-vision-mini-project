import { Card, Space, Tag, Typography } from 'antd'
import { useMemo } from 'react'
import styled from 'styled-components'
import { imageErrorHandler } from '../../libs/common'
import PostDetailsButton from '../PostDetailsButton'

type PostCardProps = {
  post: any
}

const StyledCard = styled(Card)`
.ant-card-cover {
  position: relative;
  width: 100%;
  padding-top: 60%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
`

export default function PostCard ({ post }: PostCardProps) {
  const renderedTags = useMemo(() => (
    post.tags.map((tag: string) => <Tag key={tag} style={{ margin: 0 }}>{tag}</Tag>)
  ), [post])
  return (
    <PostDetailsButton postId={post.id}>
      <StyledCard
        hoverable
        cover={<img alt="example" src={post.image} onError={imageErrorHandler} />}
      >
        <Card.Meta
          title={`${post.owner.firstName} ${post.owner.lastName}`}
          description={
            <Space direction='vertical' style={{ width: '100%' }}>
              <Typography.Paragraph ellipsis={{ rows: 2 }}>{post.text}</Typography.Paragraph>
              <Space>{renderedTags}</Space>
            </Space>
          }
        />
      </StyledCard>
    </PostDetailsButton>
  )
}
