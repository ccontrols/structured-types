type SectionName = 'title' | 'type';

type Sections = Partial<Record<SectionName, string>>;

export type RecordProps = {
  sections?: Sections;
};
