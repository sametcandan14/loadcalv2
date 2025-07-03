import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
  Spinner,
  Table,
  Modal,
} from "react-bootstrap";
import { Plus, Pencil, Trash } from "react-bootstrap-icons";

interface ContainerItem {
  id: number;
  name: string;
  width: number;
  height: number;
  length: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const CONTAINERS_API = `${API_BASE_URL}/containers.php`;

const Containers: React.FC = () => {
  const [containers, setContainers] = useState<ContainerItem[]>([]);
  const [loading, setLoading] = useState(false);
  // Modal kontrolü
  const [showModal, setShowModal] = useState(false);

  // Düzenlenecek container bilgisi
  const [selectedContainer, setSelectedContainer] =
    useState<ContainerItem | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [containerToDelete, setContainerToDelete] =
    useState<ContainerItem | null>(null);

  const [name, setName] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(CONTAINERS_API);
      setContainers(res.data);
    } catch (err) {
      toast.error("Failed to fetch containers.");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!name.trim() || !width || !length || !height) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (Number(length) < Number(width)) {
      toast.warning("Length must be greater than or equal to Width.");

      return;
    }

    try {
      await axios.post(CONTAINERS_API, {
        name: name.trim(),
        width: Number(width),
        length: Number(length),
        height: Number(height),
      });
      toast.success("Container added successfully");
      setName("");
      setWidth("");
      setLength("");
      setHeight("");
      fetchContainers();
    } catch (err) {
      toast.error("Failed to add container");
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!containerToDelete) return;

    try {
      await axios.delete(`${CONTAINERS_API}?id=${containerToDelete.id}`);
      toast.success("Container deleted");
      fetchContainers();
    } catch (err) {
      toast.error("Failed to delete container");
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setContainerToDelete(null);
    }
  };

  const handleUpdate = async () => {
    if (!selectedContainer) return;

    const { id, name, width, length, height } = selectedContainer;

    if (!name.trim() || !width || !length || !height) {
      toast.error("Please fill in all fields.");

      return;
    }

    if (length < width) {
      toast.warning("Length must be greater than or equal to Width.");

      return;
    }

    try {
      await axios.put(`${CONTAINERS_API}?id=${id}`, {
        name: name.trim(),
        width,
        length,
        height,
      });
      toast.success("Container updated successfully");

      fetchContainers();
      closeModal();
    } catch (err) {
      toast.error("Failed to update container");
      console.error(err);
    }
  };

  const openEditModal = (container: ContainerItem) => {
    setSelectedContainer({ ...container }); // Nesneyi kopyalayarak
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContainer(null);
  };

  return (
    <Container className="my-4">
      <h3 className="text-start">Add Container</h3>
      <Form className="mb-4">
        <Row className="align-items-center g-2">
          <Col xs={12} sm={4} md={3}>
            <Form.Control
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Container Name"
            />
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Width (mm)"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min={1}
                aria-label="Width"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Length (mm)"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min={1}
                aria-label="Length"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Height (mm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min={1}
                aria-label="Height"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button
              variant="success"
              onClick={handleAdd}
              aria-label="Add Container"
            >
              <Plus className="me-1" /> Add
            </Button>
          </Col>
        </Row>
      </Form>
      <h3 className="text-start">Container List</h3>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Width (mm)</th>
              <th>Length (mm)</th>
              <th>Height (mm)</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {containers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No containers found.
                </td>
              </tr>
            ) : (
              containers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.width}</td>
                  <td>{c.length}</td>
                  <td>{c.height}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => openEditModal(c)}
                      aria-label={`Edit container ${c.name}`}
                    >
                      <Pencil />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setContainerToDelete(c);
                        setShowDeleteModal(true);
                      }}
                      aria-label={`Delete container ${c.name}`}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContainer && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedContainer.name}
                  onChange={(e) =>
                    setSelectedContainer({
                      ...selectedContainer,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Width (mm)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedContainer.width}
                  onChange={(e) =>
                    setSelectedContainer({
                      ...selectedContainer,
                      width: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Length (mm)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedContainer.length}
                  onChange={(e) =>
                    setSelectedContainer({
                      ...selectedContainer,
                      length: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Height (mm)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedContainer.height}
                  onChange={(e) =>
                    setSelectedContainer({
                      ...selectedContainer,
                      height: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {containerToDelete ? (
            <p>
              Are you sure you want to delete{" "}
              <strong>{containerToDelete.name}</strong>?
            </p>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Containers;
