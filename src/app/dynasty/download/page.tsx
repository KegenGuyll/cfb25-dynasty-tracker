import dynamic from 'next/dynamic'

const DownloadDynastyFile = dynamic(
  () => import('@/components/Dynasty/DownloadDynastyFile'),
  { ssr: false }
)

const DownloadDynastyPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-4xl font-bold pb-1">Download you Dynasty Data</h1>
        <p className="text-sm font-light">
          Click the button below to download your dynasty data. This will
          download a JSON file that you can use to import your data into another
          browser or device.
        </p>
      </div>
      <DownloadDynastyFile />
    </div>
  )
}

export default DownloadDynastyPage
