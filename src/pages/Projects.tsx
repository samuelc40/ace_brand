import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '../components/Button';
import { Trash2, Plus, Upload, Save, Edit2 } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return `http://${window.location.hostname}:5000`;
    }
    return 'http://localhost:5000';
};


const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    // Admin editing states
    const [editCount, setEditCount] = useState(0);
    const [currentProject, setCurrentProject] = useState<{ id?: string, title: string, description: string }>({ title: '', description: '' });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const counterRef = useRef(null);
    const isInView = useInView(counterRef, { once: true });

    useEffect(() => {
        // Check admin status
        const token = localStorage.getItem('ace_admin_token');
        if (token === 'f96dfc73494c2ebc0266c98beaeade469af6132313c99fafa27104059a1e3b79') {
            setIsAdmin(true);
        }

        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/projects`);
            const data = await res.json();
            setProjects(data.projects);
            setCompletedCount(data.count);
            setEditCount(data.count);
        } catch (err) {
            console.error('Failed to fetch projects:', err);
        }
    };

    const handleUpdateCount = async () => {
        const token = localStorage.getItem('ace_admin_token');
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/projects/count`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ count: parseInt(editCount.toString()), adminToken: token })
            });
            if (res.ok) {
                setCompletedCount(editCount);
                alert('Counter updated!');
            }
        } catch (err) {
            console.error('Error updating count:', err);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setCurrentProject({ title: '', description: '' });
        setSelectedImage(null);
        setImagePreview(null);
        setShowForm(false);
        setIsEditing(false);
    };

    const handleEditClick = (project: Project) => {
        setCurrentProject({ id: project.id, title: project.title, description: project.description });
        setImagePreview(`${getApiBaseUrl()}${project.imageUrl}`);
        setIsEditing(true);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isEditing && (!selectedImage || !imagePreview)) {
            alert('Please select an image for new projects');
            return;
        }

        setIsSubmitting(true);
        const token = localStorage.getItem('ace_admin_token');

        try {
            let res;
            if (isEditing && currentProject.id) {
                // Update existing project
                res = await fetch(`${getApiBaseUrl()}/api/projects/${currentProject.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: currentProject.title,
                        description: currentProject.description,
                        adminToken: token
                    })
                });
            } else {
                // Create new project
                res = await fetch(`${getApiBaseUrl()}/api/projects`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: currentProject.title,
                        description: currentProject.description,
                        image: imagePreview,
                        adminToken: token
                    })
                });
            }

            if (res.ok) {
                const data = await res.json();
                if (isEditing) {
                    setProjects(projects.map(p => p.id === currentProject.id ? { ...p, ...data.project } : p));
                } else {
                    setProjects([data.project, ...projects]);
                }
                resetForm();
            } else {
                alert('Failed to save project');
            }
        } catch (err) {
            console.error('Error saving project:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const token = localStorage.getItem('ace_admin_token');
        try {
            const res = await fetch(`${getApiBaseUrl()}/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminToken: token })
            });

            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
            }
        } catch (err) {
            console.error('Error deleting project:', err);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Counter Section */}
                <div className="text-center mb-20" ref={counterRef}>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Our <span className="text-cyber-green">Achievements</span>
                    </h1>

                    <div className="relative inline-block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyber-green to-cyber-blue font-mono"
                        >
                            {completedCount}
                        </motion.div>
                        <p className="text-2xl text-gray-400 mt-4 tracking-widest uppercase">Projects Completed</p>
                    </div>

                    {/* Admin Counter Controls */}
                    {isAdmin && (
                        <div className="mt-8 flex justify-center items-center gap-4 bg-cyber-gray/30 p-4 rounded-lg max-w-sm mx-auto border border-cyber-green/20">
                            <span className="text-cyber-green text-sm font-mono">ADMIN: Update Count</span>
                            <input
                                type="number"
                                value={editCount}
                                onChange={(e) => setEditCount(parseInt(e.target.value))}
                                className="bg-black/50 border border-cyber-green/30 rounded px-3 py-1 text-white w-24 text-center"
                            />
                            <button onClick={handleUpdateCount} className="p-2 bg-cyber-green/20 rounded hover:bg-cyber-green/40 transition-colors text-green-400">
                                <Save size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Projects Grid */}
                <div>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white">Project Gallery</h2>
                        {isAdmin && (
                            <Button
                                variant="primary"
                                onClick={() => {
                                    if (showForm) resetForm();
                                    else setShowForm(true);
                                }}
                                className="flex items-center gap-2"
                            >
                                <Plus size={20} /> {showForm ? 'Cancel' : 'Add New Project'}
                            </Button>
                        )}
                    </div>

                    {/* Admin Form */}
                    {isAdmin && showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-cyber-gray/20 border border-cyber-green/20 rounded-xl p-8 mb-12"
                        >
                            <h3 className="text-xl font-bold text-white mb-6">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Project Title"
                                            value={currentProject.title}
                                            onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyber-green focus:outline-none"
                                            required
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={currentProject.description}
                                            onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyber-green focus:outline-none h-32"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-6 hover:border-cyber-green transition-colors cursor-pointer relative bg-black/30">
                                        {!isEditing && (
                                            <input
                                                type="file"
                                                onChange={handleImageSelect}
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        )}
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="max-h-48 rounded object-contain" />
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <Upload className="mx-auto h-12 w-12 mb-2" />
                                                <p>Click to upload image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : 'Save Project'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-cyber-gray/10 border border-gray-800 rounded-xl overflow-hidden hover:border-cyber-green/30 transition-all duration-300 group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.imageUrl.startsWith('http') ? project.imageUrl : `${getApiBaseUrl()}${project.imageUrl}`}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                                </div>

                                <div className="p-6 relative">
                                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>

                                    {isAdmin && (
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => handleEditClick(project)}
                                                className="p-2 bg-blue-500/20 text-blue-500 rounded-full hover:bg-blue-500/40 transition-colors"
                                                title="Edit Project"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500/40 transition-colors"
                                                title="Delete Project"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-xl">No completed projects to display yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
