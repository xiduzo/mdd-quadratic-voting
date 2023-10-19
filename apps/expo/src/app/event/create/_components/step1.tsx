import { useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFormContext } from "react-hook-form";

import { Icon } from "~/_components/Icon";
import { Typography } from "~/_components/Typography";
import type { FormData } from "../index";

export const Step1 = () => {
  const { setValue, getValues } = useFormContext<FormData>();
  const [image, setImage] = useState<string | undefined>(getValues("imageUri"));

  const pickDocument = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];

        setImage(asset.uri);

        // TODO upload image
        setValue("imageUri", asset.uri);
      }
    } catch {
      // Do some catching
    }
  };
  return (
    <View className="mt-8 grow">
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: Dimensions.get("window").width - 64,
            height: Dimensions.get("window").width - 64,
          }}
        />
      )}
      {!image && (
        <TouchableOpacity
          onPress={pickDocument}
          className="rounded-lg border-2 border-slate-900/50 p-4"
        >
          <Typography dimmed>Upload photo...</Typography>
          <View className="flex min-h-[200px] items-center justify-center">
            <Icon name="upload" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
