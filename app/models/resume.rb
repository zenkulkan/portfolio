class Resume
  def self.data
    @data ||= YAML.load_file(Rails.root.join('config', 'resume.yml'))
  end

  def self.name; data['name']; end
  def self.title; data['title']; end
  def self.location; data['location']; end
  def self.email; data['email']; end
  def self.linkedin; data['linkedin']; end
  def self.github; data['github']; end
  def self.summary; data['summary']; end
  def self.skills; data['skills'] || []; end
  def self.experience; data['experience'] || []; end
  def self.certifications; data['certifications'] || []; end
  def self.education; data['education'] || []; end
end