import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { generateImageUrl } from '../../fileStorage/attachmentUtils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('generateImageUrl')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Generating image url event: ', event)
    const todoId = event.pathParameters.todoId
    const uploadUrl = await generateImageUrl(todoId)
    logger.info('Generate image successfully')

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl
      })
    }
  })
