const woridIcons: { [key: string]: string } = {};

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

function importAll(r: ReturnType<typeof require.context>) {
  r.keys().forEach((fileName: string) => {
    const key = fileName.replace("./", "").replace(/\.[^/.]+$/, ""); // 파일명만 추출
    woridIcons[key] = (r(fileName) as { default: string }).default;
  });
}

// woridIcons 폴더 내 모든 png 파일을 import
importAll(require.context("./", false, /\.png$/));

export default woridIcons;
