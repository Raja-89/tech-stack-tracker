import { useState, useEffect } from 'react';
import { Plus, Code, Database, Server, Palette, Globe, Star, TrendingUp, Calendar, Award, Target, BookOpen, Trash2, Edit3, BarChart3, PieChart, Activity } from 'lucide-react';

export default function TechStackTracker() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  
  const [techStack, setTechStack] = useState([
    {
      id: 1,
      name: 'React',
      category: 'Frontend',
      proficiency: 90,
      experience: '3 years',
      lastUsed: '2024-07-27',
      projects: 12,
      certifications: ['React Developer Certification'],
      learningGoal: 'Master React 18 features',
      color: '#61DAFB',
      icon: '⚛️'
    },
    {
      id: 2,
      name: 'Node.js',
      category: 'Backend',
      proficiency: 85,
      experience: '2.5 years',
      lastUsed: '2024-07-25',
      projects: 8,
      certifications: [],
      learningGoal: 'Learn microservices architecture',
      color: '#339933',
      icon: '🟢'
    },
    {
      id: 3,
      name: 'Python',
      category: 'Backend',
      proficiency: 80,
      experience: '4 years',
      lastUsed: '2024-07-20',
      projects: 15,
      certifications: ['Python Institute PCAP'],
      learningGoal: 'Master Django REST framework',
      color: '#3776AB',
      icon: '🐍'
    },
    {
      id: 4,
      name: 'PostgreSQL',
      category: 'Database',
      proficiency: 75,
      experience: '2 years',
      lastUsed: '2024-07-22',
      projects: 6,
      certifications: [],
      learningGoal: 'Advanced query optimization',
      color: '#336791',
      icon: '🐘'
    },
    {
      id: 5,
      name: 'Docker',
      category: 'DevOps',
      proficiency: 70,
      experience: '1.5 years',
      lastUsed: '2024-07-26',
      projects: 5,
      certifications: [],
      learningGoal: 'Kubernetes orchestration',
      color: '#2496ED',
      icon: '🐳'
    },
    {
      id: 6,
      name: 'Figma',
      category: 'Design',
      proficiency: 65,
      experience: '1 year',
      lastUsed: '2024-07-24',
      projects: 4,
      certifications: [],
      learningGoal: 'Advanced prototyping',
      color: '#F24E1E',
      icon: '🎨'
    }
  ]);

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 50,
    experience: '',
    projects: 0,
    certifications: [],
    learningGoal: '',
    color: '#6366F1',
    icon: '💻'
  });

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Mobile', 'AI/ML', 'Other'];
  const categoryIcons = {
    Frontend: Globe,
    Backend: Server,
    Database: Database,
    DevOps: Activity,
    Design: Palette,
    Mobile: '📱',
    'AI/ML': '🤖',
    Other: Code
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill = {
        ...newSkill,
        id: Date.now(),
        lastUsed: new Date().toISOString().split('T')[0]
      };
      setTechStack([...techStack, skill]);
      setNewSkill({
        name: '',
        category: 'Frontend',
        proficiency: 50,
        experience: '',
        projects: 0,
        certifications: [],
        learningGoal: '',
        color: '#6366F1',
        icon: '💻'
      });
      setShowAddModal(false);
    }
  };

  const updateSkill = () => {
    setTechStack(techStack.map(skill => 
      skill.id === editingSkill.id ? editingSkill : skill
    ));
    setEditingSkill(null);
  };

  const deleteSkill = (id) => {
    setTechStack(techStack.filter(skill => skill.id !== id));
  };

  const getStats = () => {
    const totalProjects = techStack.reduce((sum, skill) => sum + skill.projects, 0);
    const averageProficiency = Math.round(
      techStack.reduce((sum, skill) => sum + skill.proficiency, 0) / techStack.length
    );
    const totalCertifications = techStack.reduce((sum, skill) => sum + skill.certifications.length, 0);
    const categoryCount = [...new Set(techStack.map(skill => skill.category))].length;

    return { totalProjects, averageProficiency, totalCertifications, categoryCount };
  };

  const getCategoryData = () => {
    const categoryGroups = techStack.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryGroups).map(([category, count]) => ({
      category,
      count,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
  };

  const stats = getStats();
  const categoryData = getCategoryData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tech Stack Tracker</h1>
                <p className="text-sm text-gray-600">Manage and showcase your technical skills</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Plus size={20} />
              Add Skill
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { key: 'skills', label: 'Skills', icon: Star },
              { key: 'analytics', label: 'Analytics', icon: TrendingUp },
              { key: 'goals', label: 'Learning Goals', icon: Target }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Skills</p>
                    <p className="text-3xl font-bold text-gray-900">{techStack.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Code className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Globe className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Proficiency</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.averageProficiency}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Certifications</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalCertifications}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Award className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Skills & Categories */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Top Skills by Proficiency</h3>
                <div className="space-y-4">
                  {techStack
                    .sort((a, b) => b.proficiency - a.proficiency)
                    .slice(0, 5)
                    .map((skill) => (
                      <div key={skill.id} className="flex items-center gap-4">
                        <div className="text-2xl">{skill.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${skill.proficiency}%`,
                                backgroundColor: skill.color
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Skills by Category</h3>
                <div className="space-y-3">
                  {categoryData.map(({ category, count, color }) => {
                    const Icon = categoryIcons[category];
                    return (
                      <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {typeof Icon === 'string' ? (
                            <span className="text-xl">{Icon}</span>
                          ) : (
                            <Icon size={20} className="text-gray-600" />
                          )}
                          <span className="font-medium">{category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{count} skills</span>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Management */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {techStack.map((skill) => (
                <div key={skill.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{skill.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <p className="text-sm text-gray-500">{skill.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingSkill({ ...skill })}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Proficiency</span>
                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${skill.proficiency}%`,
                            backgroundColor: skill.color
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Experience</span>
                        <p className="font-medium">{skill.experience}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Projects</span>
                        <p className="font-medium">{skill.projects}</p>
                      </div>
                    </div>

                    {skill.certifications.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500">Certifications</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {skill.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {skill.learningGoal && (
                      <div>
                        <span className="text-sm text-gray-500">Learning Goal</span>
                        <p className="text-sm font-medium text-gray-700">{skill.learningGoal}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-6">Proficiency Distribution</h3>
              <div className="space-y-4">
                {techStack
                  .sort((a, b) => b.proficiency - a.proficiency)
                  .map((skill) => (
                    <div key={skill.id} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">{skill.name}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                        <div
                          className="h-4 rounded-full flex items-center justify-end pr-2 text-xs font-medium text-white"
                          style={{
                            width: `${skill.proficiency}%`,
                            backgroundColor: skill.color
                          }}
                        >
                          {skill.proficiency}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Project Distribution</h3>
                <div className="space-y-3">
                  {techStack
                    .sort((a, b) => b.projects - a.projects)
                    .map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-600">{skill.projects} projects</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {techStack
                    .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed))
                    .slice(0, 6)
                    .map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-600">
                          {new Date(skill.lastUsed).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Goals */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="text-blue-600" size={20} />
                Active Learning Goals
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {techStack
                  .filter(skill => skill.learningGoal)
                  .map((skill) => (
                    <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-xl">{skill.icon}</div>
                        <div>
                          <h4 className="font-medium">{skill.name}</h4>
                          <p className="text-sm text-gray-500">{skill.category}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{skill.learningGoal}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Current: {skill.proficiency}%</span>
                        <span>•</span>
                        <span>{skill.experience} experience</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Skill Modal */}
      {(showAddModal || editingSkill) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={editingSkill ? editingSkill.name : newSkill.name}
                    onChange={(e) => {
                      if (editingSkill) {
                        setEditingSkill({ ...editingSkill, name: e.target.value });
                      } else {
                        setNewSkill({ ...newSkill, name: e.target.value });
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., React, Python, Docker"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingSkill ? editingSkill.category : newSkill.category}
                    onChange={(e) => {
                      if (editingSkill) {
                        setEditingSkill({ ...editingSkill, category: e.target.value });
                      } else {
                        setNewSkill({ ...newSkill, category: e.target.value });
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency: {editingSkill ? editingSkill.proficiency : newSkill.proficiency}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingSkill ? editingSkill.proficiency : newSkill.proficiency}
                    onChange={(e) => {
                      if (editingSkill) {
                        setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) });
                      } else {
                        setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) });
                      }
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={editingSkill ? editingSkill.experience : newSkill.experience}
                    onChange={(e) => {
                      if (editingSkill) {
                        setEditingSkill({ ...editingSkill, experience: e.target.value });
                      } else {
                        setNewSkill({ ...newSkill, experience: e.target.value });
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 2 years, 6 months"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
                  <input
                    type="number"
                    value={editingSkill ? editingSkill.projects : newSkill.projects}
                    onChange={(e) => {
                      if (editingSkill) {
                        setEditingSkill({ ...editingSkill, projects: parseInt(e.target.value) || 0 });
                      } else {
                        setNewSkill({ ...newSkill, projects: parseInt(e.target.value) || 0 });
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Number of projects"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Learning Goal</label>
                  <textarea
                    value={editingSkill ? editingSkill.learningGoal : newSkill.learningGoal}
                    onChange={(e) => {
                      if (editingSkill) {
                        setEditingSkill({ ...editingSkill, learningGoal: e.target.value });
                      } else {
                        setNewSkill({ ...newSkill, learningGoal: e.target.value });
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    rows={2}
                    placeholder="What do you want to learn next?"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingSkill(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={editingSkill ? updateSkill : addSkill}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
                >
                  {editingSkill ? 'Update' : 'Add'} Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
