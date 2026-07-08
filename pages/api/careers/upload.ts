import type { NextApiRequest, NextApiResponse } from 'next';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({
      error: 'blob_not_configured',
      message: 'File uploads require BLOB_READ_WRITE_TOKEN. Contact the team or try again later.',
    });
  }

  try {
    const body = req.body as HandleUploadBody;
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = clientPayload ? JSON.parse(clientPayload) : {};
        const kind = payload.kind as string | undefined;
        const jobSlug = payload.jobSlug as string | undefined;

        const isVideo = kind === 'video';
        const isResume = kind === 'resume';

        return {
          allowedContentTypes: isVideo
            ? ['video/mp4', 'video/quicktime', 'video/webm']
            : [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ],
          maximumSizeInBytes: isVideo ? 100 * 1024 * 1024 : 5 * 1024 * 1024,
          tokenPayload: JSON.stringify({ kind, jobSlug }),
          pathname: jobSlug
            ? `careers/${jobSlug}/${Date.now()}-${pathname}`
            : `careers/uploads/${Date.now()}-${pathname}`,
        };
      },
      onUploadCompleted: async () => {
        // Metadata saved in /api/careers/apply
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (err) {
    console.error('[careers/upload]', err);
    return res.status(500).json({
      error: 'upload_failed',
      message: err instanceof Error ? err.message : 'Upload failed',
    });
  }
}