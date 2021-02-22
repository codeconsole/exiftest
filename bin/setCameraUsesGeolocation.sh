if [ $# -lt 1 ]; then
  echo "setCameraUsesGeolocation.sh true/false"
  exit
fi

if [ "$1" == "true" ]; then
  sed -i '' "s/CameraUsesGeolocation\" value=\"false\" \/>/CameraUsesGeolocation\" value=\"true\" \/>/g" config.xml
  echo "*** Set CameraUsesGeolocation to $1."
else
  sed -i '' "s/CameraUsesGeolocation\" value=\"true\" \/>/CameraUsesGeolocation\" value=\"false\" \/>/g" config.xml
  echo "*** Set CameraUsesGeolocation to false."
fi
