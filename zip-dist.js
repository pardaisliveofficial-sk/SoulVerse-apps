import AdmZip from 'adm-zip';
import path from 'path';

try {
  const zip = new AdmZip();
  const distPath = path.resolve('dist');

  // Add the contents of the dist folder to the root of the zip archive
  zip.addLocalFolder(distPath);

  // Write zip to the root workspace directory
  zip.writeZip(path.resolve('dist.zip'));

  console.log('dist.zip created successfully!');
} catch (error) {
  console.error('Error creating dist.zip:', error);
  process.exit(1);
}
