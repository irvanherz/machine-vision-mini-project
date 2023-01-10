import { Drawer, Image, Space, Tag, Typography } from 'antd'
import { cloneElement, ReactElement, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { DEFAULT_IMAGE } from '../../libs/common'
import PostService from '../../services/post'
import ContentGateway from '../ContentGateway'

type PostDetailsButtonProps = {
  postId: any
  children: ReactElement
}

export default function PostDetailsButton ({ postId, children }: PostDetailsButtonProps) {
  const [open, setOpen] = useState(false)
  const { data, error, status } = useQuery(['post.details', postId], () => PostService.findById(postId), { enabled: open })

  const post: any = data?.data || {}

  const handleToggleOpen = () => setOpen(!open)

  const renderedTags = useMemo(() => (post?.tags ? post.tags.map((tag: string) => <Tag key={tag} style={{ marginBottom: 8 }}>{tag}</Tag>) : null), [post])

  return (
    <>
      {cloneElement(children, { onClick: handleToggleOpen })}
      <Drawer onClose={handleToggleOpen} open={open}>
        <ContentGateway data={data} error={error} status={status} >
          <Space direction="vertical">
            <Image src={post.image} fallback={DEFAULT_IMAGE} />
            <Typography.Title level={2}>{post.title}</Typography.Title>
            <Typography.Paragraph>{post.text}</Typography.Paragraph>
            <div>
              {renderedTags}
            </div>
          </Space>
        </ContentGateway>

      </Drawer>
    </>
  )
}
