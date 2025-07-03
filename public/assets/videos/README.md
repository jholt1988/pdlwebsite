# Video Assets Directory

This directory contains video files for the Welcome Video Overlay component.

## Video Requirements

### Technical Specifications
- **Format**: MP4 (H.264/AVC)
- **Resolution**: 1920x1080 (Full HD) recommended
- **Aspect Ratio**: 16:9
- **Frame Rate**: 30fps
- **Duration**: 30-60 seconds recommended
- **File Size**: Under 50MB for optimal loading
- **Audio**: Optional (video starts muted)

### Encoding Settings
- **Video Codec**: H.264/AVC, High Profile
- **Audio Codec**: AAC, 128kbps (if audio included)
- **Container**: MP4
- **Optimization**: Web-optimized with fast start

### Multiple Format Support
For best browser compatibility, provide multiple formats:

```
welcome-video.mp4     # Primary format (H.264)
welcome-video.webm    # Alternative format (VP9/AV1)
welcome-video-mobile.mp4  # Optimized for mobile devices
```

### Poster Images
Include poster images for better loading experience:

```
welcome-video-poster.jpg     # 1920x1080, optimized JPEG
welcome-video-poster-mobile.jpg  # Mobile-optimized version
```

## Accessibility Requirements

### Video Content Guidelines
- Ensure high contrast visuals
- Include important visual information in audio description
- Use clear, legible text overlays
- Avoid rapid flashing or strobing effects
- Provide meaningful visual content that enhances the user experience

### Audio Considerations
- If including audio, ensure it's clear and well-mixed
- Keep volume levels consistent
- Avoid sudden loud sounds or jarring audio transitions
- Consider providing audio descriptions for visual-only content

## Performance Optimization

### Compression Guidelines
- Use modern encoding tools (FFmpeg, Handbrake)
- Optimize for streaming with progressive download
- Consider adaptive bitrate streaming for longer videos
- Test loading performance on various connection speeds

### Example FFmpeg Commands

```bash
# Standard web-optimized MP4
ffmpeg -i input.mov -c:v libx264 -profile:v high -crf 23 -c:a aac -b:a 128k -movflags +faststart welcome-video.mp4

# Mobile-optimized version
ffmpeg -i input.mov -c:v libx264 -profile:v main -crf 28 -vf scale=1280:720 -c:a aac -b:a 96k -movflags +faststart welcome-video-mobile.mp4

# WebM alternative
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k welcome-video.webm
```

## Sample Files

To test the component, you can use these placeholder video URLs:
- [Big Buck Bunny MP4](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4)
- [Elephant's Dream WebM](https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.webm)

Replace these with your actual welcome video files.